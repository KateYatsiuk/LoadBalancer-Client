import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import './ProgressCounter.styles.scss';

function CalculationProgressMonitor({ onConnectionIdReceived }: { onConnectionIdReceived: (connectionId: string) => void }) {
    // function CalculationProgressMonitor() {
    const [progress, setProgress] = useState(0);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const myCookieValue = document.cookie.split('; ');
    const newC = myCookieValue.find(row => row.startsWith('reqq='));
    let uniqueCookieValue = '';
    if (newC) {
        uniqueCookieValue = newC!.split('=')[1];
    }

    useEffect(() => {
        const startConnection = async () => {
            try {
                const newConnection = new HubConnectionBuilder()
                    .withUrl('http://localhost:8082/calculationProgressHub', {
                        withCredentials: true,
                    })
                    .configureLogging(LogLevel.Information)
                    .build();
                newConnection.on('UpdateProgress', (newProgress) => {
                    setProgress(newProgress)
                });

                await newConnection.start();

                setConnection(newConnection);
                console.log("ID " + newConnection.connectionId);

                onConnectionIdReceived(newConnection.connectionId ? newConnection.connectionId : 'nothing');
                console.log('Підключено до SignalR Hub');
            } catch (error) {
                console.error('Помилка підключення до SignalR Hub:', error);
            }
        };
        startConnection();
    }, []);

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
