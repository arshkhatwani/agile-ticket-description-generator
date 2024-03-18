import { useRecoilState } from "recoil";
import { additionalDetailsState } from "../../state/atoms/prompt";
import ToggleBtn from "../ToggleBtn";

export default function AdditonalDetails() {
    const [additionalDetails, setAdditionalDetails] = useRecoilState(
        additionalDetailsState
    );

    return (
        <div className="my-2 w-[80%] flex items-center gap-3 text-xl default-text-color">
            <ToggleBtn
                value={true}
                current={additionalDetails}
                label="Include details like what, why (if applicable)"
                onClick={() => setAdditionalDetails((prev) => !prev)}
            />
        </div>
    );
}
