import { Button, Card, Col, InputNumber, Row, Statistic, message } from "antd";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { useState } from "react";
import httpModule from "../../app/common/helpers/http.module";

import './HomePage.styles.scss';
import CalculationProgressMonitor from "../ProgressCounter/ProgressCounter.component";
import { CALCULATE_CONSTANTS } from "../../app/common/constants/validation.constants";
import { v4 as uuidv4 } from 'uuid';

function FormulaDisplay() {
    return (
        <div className="formula-container">
            <h3>Ряди Маклорена тригонометричних функцій</h3>
            <BlockMath math="\sin(x) = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \ldots" />
            <BlockMath math="\cos(x) = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \ldots" />
        </div>
    );
}

const HomePage = (_props: { userName: string }) => {
    const DEFAULT_NVALUE = 10000;
    const [sinValue, setSinValue] = useState<number>();
    const [cosValue, setCosValue] = useState<number>();
    const [nValue, setnValue] = useState<number>(DEFAULT_NVALUE);
    const [sinResult, setSinResult] = useState<number | null>(null);
    const [cosResult, setCosResult] = useState<number | null>(null);
    const [showResults, setShowResults] = useState(false);
    const noSin = sinValue === undefined || sinValue === null;
    const noCos = cosValue === undefined || cosValue === null;
    const noN = nValue === undefined || nValue === null;
    const [calculating, setCalculating] = useState(false);
    const [uniqueURI, setUniqueURI] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    async function handleCalculateClick(_event: any): Promise<void> {
        const newUniqueURI = uuidv4();
        setUniqueURI(newUniqueURI);
        const now = new Date().toISOString();
        const parts = now.split("T");
        const withoutMs = parts[0];
        const identifier = withoutMs + newUniqueURI;
        console.log("In home " + identifier);
        setCurrentDateTime(identifier);
        try {
            setCalculating(true);
            const response = await httpModule.post(`Trigonometry/calculate`, {
                xForSin: sinValue,
                xForCos: cosValue,
                n: nValue,
                dateTime: identifier,
            }, {
                headers: { 'Content-Type': 'application/json', 'X-URI': newUniqueURI, },
            });
            const calculatedResult = response.data;

            const sinx = calculatedResult.sinResult ?? null;
            const cosx = calculatedResult.cosResult ?? null;
            console.log('Результат обчислення:', sinx, cosx);
            setSinResult(sinx);
            setCosResult(cosx);
            if (response.status === 204) {
                message.warning('You requested cancellation');
            } else {
                message.success('Result is ready');
                setShowResults(true);
            }
        } catch (error: any) {
            message.error('Error');
        }
        setTimeout(() => {
            setCalculating(false);
        }, 1000);
    }

    async function handleCancelClick(_event: any): Promise<void> {
        try {
            await httpModule.post(`Trigonometry/cancel`, null, { headers: { 'X-URI': uniqueURI, } });
            setCalculating(false);
        } catch {
            message.error('Error');
        }
    }

    return (
        <div className="home-page-container">
            <FormulaDisplay />
            <h4>Обчислити значення тригонометричних функцій: </h4>
            <div className="sin-cos-container">
                <div className="sin-cos-input">
                    <span>sin </span>
                    <InputNumber<number>
                        min={CALCULATE_CONSTANTS.X_MIN}
                        max={CALCULATE_CONSTANTS.X_MAX}
                        step={CALCULATE_CONSTANTS.X_STEP}
                        onChange={value => {
                            setSinValue(value!);
                            setSinResult(null);
                        }}
                    />
                </div>
                <div className="sin-cos-input">
                    <span>cos </span>
                    <InputNumber<number>
                        min={CALCULATE_CONSTANTS.X_MIN}
                        max={CALCULATE_CONSTANTS.X_MAX}
                        step={CALCULATE_CONSTANTS.X_STEP}
                        onChange={value => {
                            setCosValue(value!);
                            setCosResult(null);
                        }}
                    />
                </div>
                <div className="sin-cos-input">
                    <span>accuracy </span>
                    <InputNumber<number>
                        defaultValue={DEFAULT_NVALUE}
                        min={CALCULATE_CONSTANTS.N_MIN}
                        max={CALCULATE_CONSTANTS.N_MAX}
                        step={CALCULATE_CONSTANTS.N_STEP}
                        onChange={value => setnValue(value!)}
                    />
                </div>
            </div>
            <div className="button-container">
                <Button
                    type="primary"
                    onClick={handleCalculateClick}
                    disabled={noSin && noCos || noN}
                >
                    Обчислити
                </Button>
                <Button danger onClick={handleCancelClick}>
                    Скасувати
                </Button>
            </div>
            <CalculationProgressMonitor calculating={calculating} datetime={currentDateTime} />
            {showResults ? (
                <Card title="Результат обчислення" style={{ marginTop: '20px' }}>
                    <Row gutter={16}>
                        {sinValue ? (
                            <Col span={12} offset={cosValue === undefined ? 6 : 0}>
                                <Statistic title={`sin(${sinValue})`} value={sinResult !== null ? sinResult : '-'} />
                            </Col>
                        ) : null}
                        {cosValue ? (
                            <Col span={12} offset={sinValue === undefined ? 6 : 0}>
                                <Statistic title={`cos(${cosValue})`} value={cosResult !== null ? cosResult : '-'} />
                            </Col>
                        ) : null}
                    </Row>
                </Card>
            ) : null}
        </div>
    );
};

export default HomePage;
