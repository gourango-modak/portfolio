import { useState } from "react";
import PostCard from "./Card";

const PostGrid = ({ posts }) => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handleEdit = (post) => {
        setSelectedPost(post);
        // Open modal only after state updates
        setTimeout(() => {
            setIsPostModalOpen(true);
        }, 0);
    };

    const handleCloseModal = () => {
        setIsPostModalOpen(false);
        setSelectedPost(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} onEdit={handleEdit} />
                ))}
            </div>
        </>
    );
};

export default PostGrid;
