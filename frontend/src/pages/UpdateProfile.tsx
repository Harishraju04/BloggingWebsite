import { Appbar } from "../components/Appbar"
import { UpdateProfileCom } from "../components/UpdateProfileCom"
import { useProfile } from "../hooks"

export const UpdateProfile = ()=>{
    const {profile} = useProfile();
    return <div>
        <UpdateProfileCom currname={profile?.name} curremail={profile?.email} currdescription={profile?.description}></UpdateProfileCom>
    </div>
}