import { HANDLE_CIRCLE_SIZE } from "./constants";

export const HandleCircle = ({ x, y, cursor, handleId }) => (
    <circle
        cx={x}
        cy={y}
        r={HANDLE_CIRCLE_SIZE}
        fill="white"
        stroke="#007AFF"
        strokeWidth={1}
        cursor={cursor}
        data-handle-id={handleId}
    />
);
