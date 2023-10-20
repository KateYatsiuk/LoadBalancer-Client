import { useEffect, useState } from 'react';
import { Table, Tag, message } from 'antd';
import httpModule from '../../app/common/helpers/http.module';

import './History.styles.scss';
import { ColumnProps } from 'antd/es/table';

type ColumnType = {
    calculationDate: string;
    accuracy: number;
    xForSin?: number | null;
    xForCos?: number | null;
    sinResult?: number | null;
    cosResult?: number | null;
};

const WIDTH = {
    DATE: 200,
    ACCURACY_XFORS: 150,
    RESULTS: 250,
};

const CalculationHistory = () => {
    const [calculations, setCalculations] = useState([]);

    useEffect(() => {
        async function fetchCalculations() {
            try {
                const response = await httpModule.get('Trigonometry/history');
                const data = response.data;
                setCalculations(data);
            } catch (error) {
                message.error('Error');
            }
        }

        fetchCalculations();
    }, []);

    function renderCell(text: number | null | undefined) {
        return text != null ? text : <Tag color="red">Не вказано</Tag>;
    }

    const columns: ColumnProps<ColumnType>[] = [
        {
            title: 'Дата та час',
            dataIndex: 'calculationDate',
            key: 'calculationDate',
            sorter: (a: { calculationDate: string }, b: { calculationDate: string }) => a.calculationDate.localeCompare(b.calculationDate),
            defaultSortOrder: 'descend',
            sortDirections: ['descend', 'ascend', 'descend'],
            width: WIDTH.DATE,
            render: (text: string) => {
                const formattedDate = new Date(text).toLocaleString();
                return <Tag color="green" style={{ fontWeight: 'bold' }}>{formattedDate}</Tag>
            }
        },
        {
            title: 'Точність',
            dataIndex: 'accuracy',
            key: 'accuracy',
            width: WIDTH.ACCURACY_XFORS,
        },
        {
            title: 'XForSin',
            dataIndex: 'xForSin',
            key: 'xForSin',
            width: WIDTH.ACCURACY_XFORS,
            render: renderCell,
        },
        {
            title: 'XForCos',
            dataIndex: 'xForCos',
            key: 'xForCos',
            width: WIDTH.ACCURACY_XFORS,
            render: renderCell,
        },
        {
            title: 'SinResult',
            dataIndex: 'sinResult',
            key: 'sinResult',
            width: WIDTH.RESULTS,
            render: renderCell,
        },
        {
            title: 'CosResult',
            dataIndex: 'cosResult',
            key: 'cosResult',
            width: WIDTH.RESULTS,
            render: renderCell,
        },
    ];

    return (
        <div className="calculation-history-wrapper">
            <h2>Історія обчислень</h2>
            <Table
                dataSource={calculations}
                columns={columns}
                pagination={{
                    pageSize: 7,
                }}
                rowKey="calculationDate"
            />
        </div>
    );
};

export default CalculationHistory;
