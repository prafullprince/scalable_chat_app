import { User } from "../../models";

export class UserRepository {
    // fetch_user_details
    async fetchUserDetails(userId: string) {
        const user = await User.findById(userId)
                            .select("name email avatarUrl about").lean();
        return user;
    }

}
