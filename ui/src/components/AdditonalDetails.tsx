import { useRecoilState } from "recoil";
import { additionalDetailsState } from "../state/atoms/prompt";

export default function AdditonalDetails() {
    const [additionalDetails, setAdditionalDetails] = useRecoilState(
        additionalDetailsState
    );

    return (
        <div className="my-2 w-[80%] flex items-center gap-3 text-xl default-text-color">
            <input
                type="checkbox"
                name="additional-details"
                id="additional-details-ticket"
                checked={additionalDetails === true}
                className="largerCheckbox hover:cursor-pointer"
                onChange={(e) => setAdditionalDetails(e.target.checked)}
            />
            <label
                className="hover:cursor-pointer"
                htmlFor="additional-details-ticket">
                Include details like what, why (if applicable)
            </label>
        </div>
    );
}
