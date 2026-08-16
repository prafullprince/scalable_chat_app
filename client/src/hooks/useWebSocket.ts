import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useRef, useState } from "react";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnectRef = useRef<boolean>(true);
  const retryCountRef = useRef<number>(0);
  const access_token = useAppSelector((state) => state.auth.access_token);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!access_token) {
      return;
    }

    // New connection lifecycle
    shouldReconnectRef.current = true;
    retryCountRef.current = 0;

    async function connect() {
      const socket = new WebSocket(
        `ws://localhost:4000/?token=${access_token}`,
      );
      socketRef.current = socket;

      // onopen
      socket.onopen = () => {
        console.log("WebSocket server connected");
        retryCountRef.current = 0;
        setIsConnected(true);
      };

      // onclose
      socket.onclose = () => {
        console.log("Websocket server disconnected");
        setIsConnected(false);

        // socket could be closed due to hardRefresh or network problem
        // if hard refreshed means no need to reconnect
        if (!shouldReconnectRef.current) return;

        // otherwise need to reconnect
        const delay = Math.min(1000 * 2 ** retryCountRef.current, 30000);

        // if we retry 10 times it's means there are some seroius server problem don't try to reconnect
        retryCountRef.current += 1;
        if (retryCountRef.current > 2) return;

        // call reconnect on some delay
        reconnectTimerRef.current = setTimeout(() => {
          connect();
        }, delay);
      };

      // onerror
      socket.onerror = () => {
        console.log("Error in Websocket Server");
      };
    }
    connect();

    // cleanup
    return () => {
      // hard refresh so don't try to recconnect
      shouldReconnectRef.current = false;

      // if timer exist then cleanup that
      const timer = reconnectTimerRef.current;
      if (timer) {
        clearTimeout(timer);
      }

      setIsConnected(false);
      // close the connection
      socketRef.current?.close(); // when user refresh page
    };
  }, [access_token]);

  return { socketRef, isConnected };
}
