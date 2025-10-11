import { HANDLE_SQUARE_SIZE } from "./constants";

export const HandleSquare = ({ x, y, cursor, handleId }) => {
    const size = HANDLE_SQUARE_SIZE;

    return (
        <rect
            x={x - size / 2}
            y={y - size / 2}
            width={size}
            height={size}
            fill="white"
            stroke="#007AFF"
            strokeWidth={1}
            cursor={cursor}
            data-handle-id={handleId}
        />
    );
};
