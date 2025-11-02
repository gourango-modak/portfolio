import { useState, useEffect, useRef, useMemo, memo } from "react";
import EditorJs from "../components/editorJs/EditorJs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DateButton } from "../components/common/DateButton";

const NOTE_STORE_PREFIX = "gm-todo-notes";
const MAX_DAYS = 7;
const RECENT_DAYS_COUNT = 5;

const MemoizedEditorJs = memo(EditorJs);

const DayNotesPage = () => {
    const editorRef = useRef(null);
    const [activeDate, setActiveDate] = useState(new Date());
    const [initialData, setInitialData] = useState({});
    const [visibleDates, setVisibleDates] = useState([]);
    const [calendarDate, setCalendarDate] = useState(new Date());

    const formatDateKey = (date) => date.toISOString().split("T")[0];
    const getStorageKey = (date) =>
        `${NOTE_STORE_PREFIX}-${formatDateKey(date)}`;

    const clearExpiredNotes = () => {
        const now = new Date();
        Array.from({ length: localStorage.length }).forEach((_, i) => {
            const key = localStorage.key(i);
            if (!key?.startsWith(NOTE_STORE_PREFIX)) return;
            const date = new Date(key.replace(`${NOTE_STORE_PREFIX}-`, ""));
            const diffDays = (now - date) / (1000 * 60 * 60 * 24);
            if (diffDays > MAX_DAYS) localStorage.removeItem(key);
        });
    };

    const loadNotesForDate = (date) => {
        const data = localStorage.getItem(getStorageKey(date));
        setInitialData(data ? JSON.parse(data) : {});
    };

    const handleDataAfterSave = ({ content }) => {
        localStorage.setItem(
            getStorageKey(activeDate),
            JSON.stringify(content)
        );
    };

    const handleOnChange = async (options) => editorRef.current?.save(options);

    const generateRecentDates = () =>
        Array.from({ length: RECENT_DAYS_COUNT }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d;
        });

    const isSameDay = (d1, d2) => {
        if (!(d1 instanceof Date) || !(d2 instanceof Date)) return false;
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };
    const isDateVisible = (date) => {
        return visibleDates.some((vDate) => isSameDay(vDate, date));
    };
    const hasNote = (date) => !!localStorage.getItem(getStorageKey(date));
    const handleCalendarSelect = (date) => {
        if (date) {
            setCalendarDate(date);
            setActiveDate(date);
        }
    };

    useEffect(() => {
        clearExpiredNotes();
        setVisibleDates(generateRecentDates());
    }, []);

    useEffect(() => loadNotesForDate(activeDate), [activeDate]);

    const recentDateButtons = useMemo(
        () =>
            visibleDates.map((date) => {
                const active = isSameDay(date, activeDate);
                return (
                    <DateButton
                        key={formatDateKey(date)}
                        date={date}
                        active={active}
                        onClick={() => setActiveDate(date)}
                    />
                );
            }),
        [visibleDates, activeDate]
    );

    const calendarSelectedButton = !isDateVisible(calendarDate) ? (
        <div>
            <p className="px-4 pb-2 mb-2 text-gray-500 border-b border-gray-200">
                Calendar Date
            </p>
            <DateButton
                date={calendarDate}
                active={isSameDay(calendarDate, activeDate)}
                onClick={() => setActiveDate(calendarDate)}
            />
        </div>
    ) : null;

    return (
        <div className="flex gap-8">
            {/* Left Side – Dates + Calendar */}
            <div className="fixed flex flex-col justify-between w-[350px] h-screen border-r border-gray-200 p-2">
                <div>{recentDateButtons}</div>
                {calendarSelectedButton}
                <div className="pl-4">
                    <DayPicker
                        mode="single"
                        selected={calendarDate}
                        onSelect={handleCalendarSelect}
                        fixedWeeks
                        className="text-sm"
                        modifiers={{
                            hasNote: Array.from({ length: localStorage.length })
                                .map((_, i) => {
                                    const key = localStorage.key(i);
                                    if (!key.startsWith(NOTE_STORE_PREFIX))
                                        return null;
                                    return new Date(
                                        key.replace(`${NOTE_STORE_PREFIX}-`, "")
                                    );
                                })
                                .filter(Boolean),
                        }}
                        modifiersStyles={{
                            hasNote: {
                                backgroundColor: "#eef2ff",
                                borderRadius: "50%",
                                color: "#4f39f6",
                            },
                            selected: {
                                color: "#4f39f6",
                            },
                        }}
                    />
                </div>
            </div>

            {/* Right Side – Editor */}
            <div className="flex-1 ml-[370px] pt-8">
                <MemoizedEditorJs
                    ref={editorRef}
                    onSave={handleDataAfterSave}
                    onChange={handleOnChange}
                    initialData={initialData}
                />
            </div>
        </div>
    );
};

export default DayNotesPage;
