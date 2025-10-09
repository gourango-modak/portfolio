import { HANDLE_SQUARE_SIZE } from "./constants";

export const HandleSquare = ({ x, y, cursor, handleId }) => (
    <rect
        x={x - HANDLE_SQUARE_SIZE / 2}
        y={y - HANDLE_SQUARE_SIZE / 2}
        width={HANDLE_SQUARE_SIZE}
        height={HANDLE_SQUARE_SIZE}
        fill="white"
        stroke="#007AFF"
        strokeWidth={1}
        cursor={cursor}
        data-handle-id={handleId}
    />
);
