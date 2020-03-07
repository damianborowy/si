import React from "react";
import styles from "./style.module.scss";
import { Button } from "antd";

interface ISidebarProps {
    filenamesList: string[];
    onButtonClick: (filename: string) => void;
}

interface ISidebarState {
    selectedFilename: string;
}

export default class Sidebar extends React.Component<ISidebarProps> {
    state: Readonly<ISidebarState> = {
        selectedFilename: this.props.filenamesList[0]
    };

    onButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const selectedFilename = event.currentTarget.textContent;

        if (!selectedFilename) throw new Error("Incorrect filename");

        this.setState({ selectedFilename });
        this.props.onButtonClick(selectedFilename);
    };

    render() {
        return (
            <div className={styles.sidebar}>
                {this.props.filenamesList.map(filename => (
                    <Button
                        className={styles.button}
                        key={filename}
                        type={
                            this.state.selectedFilename === filename
                                ? "primary"
                                : "default"
                        }
                        onClick={this.onButtonClick}
                        value={filename}
                        block
                    >
                        {filename}
                    </Button>
                ))}
            </div>
        );
    }
}
