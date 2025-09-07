import Layout from "./Layout";

const PageWrapper = ({ component: Component, layout = true }) => {
    return layout ? (
        <Layout>
            <Component />
        </Layout>
    ) : (
        <Component />
    );
};

export default PageWrapper;
