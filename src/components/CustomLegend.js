export const CustomLegend = ({ datasets, toggleDataset }) => {
    return (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {datasets?.datasets?.map((dataset, index) => (
                <label key={index} style={{ cursor: 'pointer', display: 'flex', gap: '4px', alignItems: 'center' }} onClick={() => toggleDataset(index)}>
                    <div style={{
                        width: '40px',
                        height: '15px',
                        background: dataset?.backgroundColor
                    }}></div>
                    <div style={{
                        fontSize: '12px', textDecoration: dataset.hidden ? 'line-through' : 'none',
                    }}> {dataset?.label}</div>
                </label>
            ))}
        </div>
    );
};