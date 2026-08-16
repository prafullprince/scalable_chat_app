import { ApiError } from "../../utils/apiError.utils";
import { UserRepository } from "./user.repository";

export class UserService {
    private repo = new UserRepository();

    async fetchUserDetailsById(userId: string) {
        // fetch user
        const user = await this.repo.fetchUserDetails(userId);
        if(!user) {
            throw new ApiError(404, "User not found");
        }

        return user;
    }
}
