import Layout from "@/components/Layout";
import {NextPage} from "next";

const AboutPage: NextPage = (): JSX.Element => {
    return (
        <Layout title="About Breathtaking Events">
            <h1>About</h1>
            <p>This is an app to find the latest breathtaking events!</p>
            <p>Version: 1.0.0</p>
        </Layout>
    );
};

export default AboutPage;
