import Layout from "./Layout";

const PageWrapper = ({ component: Component, layout = false }) => {
    return layout ? (
        <Layout>
            <Component />
        </Layout>
    ) : (
        <Component />
    );
};

export default PageWrapper;
