import { useEffect, useState } from "react";

const ResourceLoader = ({
    id,
    fetchFn,
    children,
    loader = null,
    errorUI = null,
}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        let isMounted = true;
        setLoading(true);
        setError(null);

        fetchFn(id)
            .then((res) => {
                if (isMounted) {
                    setData(res);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id, fetchFn]);

    const CenteredMessage = ({ children }) => (
        <div className="flex items-center justify-center min-h-[20vh]">
            {children}
        </div>
    );

    if (loading)
        return (
            loader || (
                <CenteredMessage>
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mr-4"></div>
                    <p className="text-gray-500 text-lg">Loading...</p>
                </CenteredMessage>
            )
        );
    if (error)
        return (
            errorUI || (
                <CenteredMessage>
                    <p className="text-red-500 text-lg">
                        Error loading resource.
                    </p>
                </CenteredMessage>
            )
        );
    if (!data)
        return (
            <CenteredMessage>
                <p className="text-gray-400 text-lg">No data found</p>
            </CenteredMessage>
        );

    return children(data);
};

export default ResourceLoader;
