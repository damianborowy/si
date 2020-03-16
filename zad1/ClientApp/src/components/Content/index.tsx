import React from "react";
import styles from "./style.module.scss";
import CanvasJSReact from "../../canvasjs/canvasjs.react";
import DataPoints from "../../models/DataPoints";
import {Button} from "antd";
import {on} from "cluster";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface IContentProps {
    currentChartFilename: string;
    dataPoints: DataPoints;
}

export default class Content extends React.Component<IContentProps> {
    onClick = () => {
        const {dataPoints} = this.props;
        let csvContent = "data:text/csv;charset=utf-8,\n";

        for (let i = 0; i < dataPoints.best.length; i++)
            csvContent += i + "; " + dataPoints.best[i].y + "; " + dataPoints.worst[i].y + "; " + dataPoints.average[i].y + ";;;\n";

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${this.props.currentChartFilename}.csv`);
        link.click();
    };

    render() {
        return (
            <div className={styles.content}>
                {this.props.dataPoints.best.length > 0 ? (
                    <div className={styles.container}>
                        <CanvasJSChart
                            options={{
                                theme: "light2",
                                title: {
                                    text: this.props.currentChartFilename
                                },
                                toolTip: {
                                    shared: true
                                },
                                data: [
                                    {
                                        type: "line",
                                        dataPoints: this.props.dataPoints.best,
                                        name: "Best",
                                        showInLegend: true
                                    },
                                    {
                                        type: "line",
                                        dataPoints: this.props.dataPoints.worst,
                                        name: "Worst",
                                        showInLegend: true
                                    },
                                    {
                                        type: "line",
                                        dataPoints: this.props.dataPoints.average,
                                        name: "Average",
                                        showInLegend: true
                                    }
                                ]
                            }}
                        />
                        <Button type="primary" onClick={this.onClick}>
                            Eksportuj do CSV
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
