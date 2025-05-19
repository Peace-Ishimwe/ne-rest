import { toast } from "sonner";
import { useApp } from "@/contexts/app/app-context";
import { UtilsService } from "@/services/utils.service";
import { ProfileService } from "@/services/profile.service";
import { useMutation, useQuery } from "@tanstack/react-query";

const utils = new UtilsService();
const profileService = new ProfileService(utils);

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => profileService.getProfile()
    });
};

export const useUpdateProfile = () => {
    const { setUser } = useApp();

    return useMutation({
        mutationFn: (data: { firstName: string; lastName: string; }) =>
            profileService.updateProfile(data),
        onSuccess: async (response) => {
            if (response.success) {
                const { data, message } = response;
                toast.success(message);
                setUser(data.user);
            } else {
                toast.error(response.message);
            }
        },
        onError: async (error) => {
            toast.error(error.message)
        }
    });
}