import { HANDLE_SQUARE_SIZE } from "./constants";

export const HandleCircle = ({ x, y, cursor, handleId }) => (
    <circle
        cx={x}
        cy={y}
        r={HANDLE_SQUARE_SIZE / 2}
        fill="white"
        stroke="#007AFF"
        strokeWidth={1}
        cursor={cursor}
        data-handle-id={handleId}
    />
);
