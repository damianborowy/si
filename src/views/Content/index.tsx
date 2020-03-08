import React from "react";
import styles from "./style.module.scss";
import TSP from "../../models/TSP";

interface IContentProps {
    tsp: TSP;
}

export default class Content extends React.Component<IContentProps> {
    render() {
        return <div className={styles.content}>Foo in Content</div>;
    }
}
