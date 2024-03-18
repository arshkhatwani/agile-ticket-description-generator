import { useRecoilState } from "recoil";
import { ticketTypeState } from "../../state/atoms/prompt";
import ToggleBtn from "../ToggleBtn";

const ticketTypes = [
    { name: "Story", value: "story" },
    { name: "Task", value: "task" },
    { name: "Epic", value: "epic" },
];

export default function TicketType() {
    const [ticketType, setTicketType] = useRecoilState(ticketTypeState);

    return (
        <div className="flex my-4 w-[80%]">
            <div className="flex items-center gap-3 text-xl default-text-color">
                {ticketTypes.map((item) => (
                    <ToggleBtn
                        key={item.value}
                        current={ticketType}
                        value={item.value}
                        label={item.name}
                        onClick={() => setTicketType(item.value)}
                    />
                ))}
            </div>
        </div>
    );
}
