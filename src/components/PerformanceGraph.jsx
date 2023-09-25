import { VictoryChart,VictoryScatter, VictoryLine, VictoryAxis, VictoryTooltip, VictoryLabel } from 'victory';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PerformanceGraph({data}){

    console.log(data);

    const [domainX, setDomainX] = useState([new Date(2023, 0, 10), new Date(2023, 0, 15)]);
    const [minDate, setMinDate] = useState(domainX[0]);
    const [maxDate, setMaxDate] = useState(domainX[1]);

    const applyCustomDomain = () => {
        setDomainX([minDate, maxDate]);
    };

    function generateColor(){
        let luminance = 1;
        let color;
        do{
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);

            color = `rgb(${red}, ${green}, ${blue})`;
            luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        }while(luminance > 0.7 && luminance < 0.3);

        return color;
    }

    return (
        <div>

            <div style={{width:"700px", height:"900px", display: "inline-block"}}>
                <VictoryChart width={400} height={300} domain={{ x: domainX }}>
                    {data.map((oneline, index) => {
                        return (
                            <VictoryScatter
                                key={index * 2 + 1}
                                data={oneline}
                                size={5}
                                style={{ data: { fill: generateColor()} }} 
                                labels={({ datum }) => ` ${datum.y}`} 
                                labelComponent={
                                    <VictoryLabel
                                        style={{ fontSize: 10, fill: 'red' }}
                                    />
                                }
                            />
                    )})}

                    {data.map((oneline, index) => {
                        return (
                            <VictoryLine
                                key={index * 2}
                                data={oneline}
                                style={{data: {stroke: generateColor()}}}
                            /> 
                        );
                    })}
                    

                    <VictoryAxis label="Time"
                        tickFormat={(date) => new Date(date).toLocaleDateString()}
                        scale="time"
                        style={{
                            // axisLabel: { fontSize: 1 }, // Set font size for axis label
                            // tickLabels: { fontSize: 1 }, // Set font size for tick labels
                            // ticks: { size: 1 }, // Set the size of ticks
                        }}
                    />
                    <VictoryAxis dependentAxis 
                        label="Power"
                        style={{
                            // axisLabel: { fontSize: 1 }, // Set font size for axis label
                            // tickLabels: { fontSize: 1 }, // Set font size for tick labels
                            // ticks: { size: 1 }, // Set the size of ticks
                        }}
                    />
                </VictoryChart>
            </div>

            <div style={{display: "inline-block"}}>
                <div>
                    <label>Min Date:</label>
                    <DatePicker
                        selected={minDate}
                        onChange={(date) => setMinDate(date)}
                        dateFormat="yyyy-MM-dd" // Customize the date format
                    />
                    {/* <input
                        type="date"
                        value={customDomainMin}
                        onChange={(e) => setMi(new Date(e.target.value))}
                    /> */}
                </div>
                <div>
                    <label>Max Date:</label>
                    <DatePicker
                        selected={maxDate}
                        onChange={(date) => setMaxDate(new Date(date))}
                        dateFormat="yyyy-MM-dd" // Customize the date format
                    />
                    {/* <input
                        type="date"
                        value={customDomainMax}
                        onChange={(e) => setCustomDomainMax(new Date(e.target.value))}
                    /> */}
                </div>
                <button onClick={applyCustomDomain}>Apply dates</button>
            </div>
            
        </div>
        
    );
        
}