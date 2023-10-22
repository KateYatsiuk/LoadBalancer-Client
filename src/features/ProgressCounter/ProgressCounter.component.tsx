import { useEffect, useState } from 'react';
import './ProgressCounter.styles.scss';
import httpModule from '../../app/common/helpers/http.module';

interface ProgressProps {
    calculating: boolean;
    datetime: string;
}

function CalculationProgressMonitor( {calculating, datetime}: ProgressProps ) {
    const [progress, setProgress] = useState(0);

    const fetchProgress = async () => {
        console.log("In progress " + datetime);

        try {
            const response = await httpModule.get(`Trigonometry/polling?datetime=${datetime}`);
            const progressValue = response.data.progress;
            setProgress(progressValue);
            console.log(progressValue);
        } catch (error) {
            console.error('Помилка при отриманні прогресу:', error);
        }
    };

    useEffect(() => {
        if (calculating) {
            const interval = setInterval(fetchProgress, 1000);
            return () => clearInterval(interval);
        }
    }, [calculating]);

    return (
        <div className="progress-container">
            Зачекайте, триває обчислення:
            <div className="progress-text">
                {progress}%
            </div>
        </div>
    );
}

export default CalculationProgressMonitor;
