import React from "react";
import styles from "./style.module.scss";
import Agglomeration from "../../models/Agglomeration";

interface IContentProps {
    agglomeration: Agglomeration;
}

export default class Content extends React.Component<IContentProps> {
    render() {
        return <div className={styles.content}>Foo in Content</div>;
    }
}
