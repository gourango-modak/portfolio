import InfiniteScroll from "../Common/InfiniteScroll";
import PostCard from "./PostCard";

const PostsList = ({
    fetchData,
    searchTerm = "",
    selectedTags = [],
    maxItems = Infinity,
}) => (
    <InfiniteScroll
        key={`${searchTerm}-${selectedTags.join("-")}`} // force remount on filter change
        fetchData={fetchData}
        renderItem={(post) => <PostCard key={post.id} post={post} />}
        limit={10}
        maxItems={maxItems}
        containerClass="grid gap-6 md:grid-cols-2"
    />
);

export default PostsList;
