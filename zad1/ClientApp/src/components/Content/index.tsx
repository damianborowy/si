import React from "react";
import styles from "./style.module.scss";
import CanvasJSReact from "../../canvasjs/canvasjs.react";
import DataPoints from "../../models/DataPoints";
import {Button} from "antd";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface IContentProps {
    currentChartFilename: string;
    dataPoints: DataPoints;
}

export default class Content extends React.Component<IContentProps> {
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
                        <Button type="primary">
                            Export to CSV
                        </Button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
