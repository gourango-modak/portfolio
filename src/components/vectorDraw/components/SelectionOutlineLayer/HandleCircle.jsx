import { HANDLE_CIRCLE_SIZE, OUTLINE_COLOR } from "./constants";

export const HandleCircle = ({ x, y, cursor, handleId }) => (
    <circle
        cx={x}
        cy={y}
        r={HANDLE_CIRCLE_SIZE}
        fill="white"
        stroke={OUTLINE_COLOR}
        strokeWidth={1}
        cursor={cursor}
        data-handle-id={handleId}
    />
);
