import { useState, useEffect } from 'react';
import tournamentService from '../../../services/tournaments/tournamentService';

const useTournaments = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTournaments = async () => {
        setLoading(true);
        try {
            const data = await tournamentService.getTournaments();
            const flattenedData = flattenTournamentData(data);
            setTournaments(flattenedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
            setError('Failed to fetch tournaments. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTournaments();

        const id = setInterval(fetchTournaments, 5 * 60 * 1000);
        return () => clearInterval(id);
    }, []);

    return { tournaments, loading, error, setTournaments };
};

const flattenTournamentData = (data) => {
    return data.map((tournament) => {
        if (!tournament.details || !tournament.details.scheduledStart) {
            return null;
        }

        const scheduledStart = formatScheduledStart(tournament.details.scheduledStart);
        const date = new Date(scheduledStart).toLocaleDateString();
        const time = new Date(scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const playerCount = tournament.teams?.reduce(
            (acc, team) => acc + (team.players ? team.players.length : 0),
            0
        ) | 0;

        return {
            ...tournament,
            id: tournament.id,
            name: tournament.details.tournamentName || 'Unnamed Tournament',
            scheduledStart,
            date,
            time,
            playerCount,
            gameName: tournament.game.name,
            entryFeeAmount: tournament.entryFeeAmount,
            entryFeeType: tournament.entryFeeType,
        };
    }).filter((tournament) => tournament !== null);
};

const formatScheduledStart = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default useTournaments;
