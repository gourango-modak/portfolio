import { useState, useEffect, useRef, useMemo, memo } from "react";
import EditorJs from "../components/editorJs/EditorJs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DateButton } from "../components/common/DateButton";

const NOTE_STORE_PREFIX = "gm-todo-notes";
const MAX_DAYS = 30;
const RECENT_DAYS_COUNT = 7;

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
    const isDateVisible = (date) =>
        visibleDates.some((vDate) => isSameDay(vDate, date));

    const handleCalendarSelect = (date) => {
        if (!date) return;
        setActiveDate(date);
        setCalendarDate(date);

        if (!isDateVisible(date)) {
            setVisibleDates((prevDates) => {
                if (prevDates.length === RECENT_DAYS_COUNT) {
                    prevDates.pop();
                }
                return [...prevDates, date];
            });
        }
    };

    const hasNote = (date) => !!localStorage.getItem(getStorageKey(date));

    useEffect(() => {
        clearExpiredNotes();
        setVisibleDates(generateRecentDates());
    }, []);

    useEffect(() => loadNotesForDate(activeDate), [activeDate]);

    const recentDateButtons = useMemo(
        () =>
            visibleDates.map((date) => (
                <DateButton
                    key={formatDateKey(date)}
                    date={date}
                    active={isSameDay(date, activeDate)}
                    onClick={() => setActiveDate(date)}
                />
            )),
        [visibleDates, activeDate]
    );

    const memoizedEditor = useMemo(() => {
        return (
            <EditorJs
                ref={editorRef}
                onSave={handleDataAfterSave}
                onChange={handleOnChange}
                initialData={initialData}
            />
        );
    }, [initialData, handleDataAfterSave, handleOnChange]);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Left Side – Dates + Calendar */}
            <div className="md:fixed md:flex md:flex-col md:w-[350px] md:h-screen md:border-r md:border-gray-200 p-2 w-full z-10">
                {/* Recent Dates */}
                <div className="flex md:flex-col overflow-hidden overflow-x-auto md:overflow-visible gap-2 md:gap-0">
                    {recentDateButtons}
                </div>
                <div className="hidden md:block mt-4 pl-2">
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
            <div className="flex-1 md:pl-[370px] w-full p-4 md:pt-8">
                {memoizedEditor}
            </div>
        </div>
    );
};

export default DayNotesPage;
