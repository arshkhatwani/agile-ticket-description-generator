import { useRecoilState } from "recoil";
import { ticketTypeState } from "../state/atoms/prompt";

export default function TicketType() {
    const [ticketType, setTicketType] = useRecoilState(ticketTypeState);

    return (
        <div className="flex my-4 w-[80%]">
            <div className="flex items-center gap-3 text-xl default-text-color">
                <span className="font-semibold">Ticket type:</span>
                <div className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        name="story"
                        id="story-ticket"
                        checked={ticketType === "story"}
                        value="story"
                        className="largerCheckbox hover:cursor-pointer"
                        onChange={(e) => setTicketType(e.target.value)}
                    />
                    <label
                        className="hover:cursor-pointer"
                        htmlFor="story-ticket">
                        Story
                    </label>
                </div>

                <div className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        name="task"
                        id="task-ticket"
                        checked={ticketType === "task"}
                        value="task"
                        className="largerCheckbox hover:cursor-pointer"
                        onChange={(e) => setTicketType(e.target.value)}
                    />
                    <label
                        className="hover:cursor-pointer"
                        htmlFor="task-ticket">
                        Task
                    </label>
                </div>
            </div>
        </div>
    );
}
