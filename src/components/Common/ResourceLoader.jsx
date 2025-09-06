import { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";

const ResourceLoader = ({
    id,
    fetchFn,
    children,
    errorUI = null,
    loadingMessage = null,
}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const loadData = async () => {
            try {
                showLoader(loadingMessage || "Loading resource...");
                const res = await fetchFn(id);
                if (isMounted) {
                    setData(res);
                }
            } catch (err) {
                if (isMounted) setError(err);
            } finally {
                hideLoader();
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [id, fetchFn, showLoader, hideLoader]);

    if (error)
        return (
            errorUI || (
                <div className="flex items-center justify-center min-h-[20vh]">
                    <p className="text-red-500 text-lg">
                        Error loading resource.
                    </p>
                </div>
            )
        );

    if (!data) return null;

    return children(data);
};

export default ResourceLoader;
