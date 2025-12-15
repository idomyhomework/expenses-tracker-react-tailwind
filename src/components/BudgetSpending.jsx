import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

function BudgetSpending ({needs = 0, wants = 0, savings = 0}){
    const data = [
        {name: "Needs (50%) :", value: needs},
        {name: "Wants (30%) :", value: wants},
        {name: "Savings (20%) :", value: savings},
    ];

    const COLORS = ["#f43f5e", "#0088FE", "#00C49F"];

    return (
        <div style={{textAlign: "center", margin:"0 auto"}}>
            <PieChart width={320} height={400}>
                <Pie
                    data={data} cx="50%" cy="50%" outerRadius={100}
                    label = {({value}) => `$${value.toFixed(2)}`} dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip formatter={(value)=> `$${value.toFixed(2)}`}/>
                <Legend/>
            </PieChart>
        </div>
    );
}

export default BudgetSpending;