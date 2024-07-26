import { useState, useEffect } from 'react';
import { tournamentService } from '../../../services';

const useTournament = (tournamentId) => {
    const [tournament, setTournament] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const flattenTournamentData = (tournament) => {
        const scheduledStart = tournament?.details?.scheduledStart
            ? new Date(tournament.details.scheduledStart)
            : new Date();
        const date = scheduledStart.toLocaleDateString();
        const time = scheduledStart.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        return {
            id: tournament?.id || '',
            tournamentName: tournament?.details?.tournamentName || 'Unnamed Tournament',
            description: tournament?.details?.tournamentDescription || '',
            date,
            time,
            gameName: tournament?.game?.name || '',
            tournamentType: tournament?.tournamentType || '',
            tournamentFormat: tournament?.tournamentFormat || '',
            platform: tournament?.platform || '',
            maxPlayers: tournament?.details?.maxPlayers || 0,
            entryFeeAmount: tournament?.details?.entryFeeAmount || 0,
            entryFeeType: tournament?.details?.entryFeeType || '',
            status: tournament?.details?.tournamentStatus || '',
            teams: tournament?.teams || [],
        };
    };

    const fetchTournament = async () => {
        setLoading(true);
        try {
            const fetchedTournament = await tournamentService.getTournamentById(tournamentId);
            const flattenedTournament = flattenTournamentData(fetchedTournament);
            setTournament(flattenedTournament);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch tournament details:', error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTournament();
    }, [tournamentId]);

    const updateTournament = async (values) => {
        try {
            await tournamentService.updateTournament(tournamentId, values);
            await fetchTournament();
        } catch (error) {
            console.error('Failed to update tournament details:', error);
        }
    };

    const registerTeam = async (formData) => {
        try {
            formData.team.tournamentId = tournamentId;
            await tournamentService.registerTeam(formData.team);
            await fetchTournament();
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const updatePlayerStatus = async (teamId, playerId, status) => {
        try {
            await tournamentService.updatePlayerStatus(tournamentId, teamId, playerId, status);
            await fetchTournament();
        } catch (error) {
            console.error(`Failed to update player status to ${status}:`, error);
        }
    };

    return { tournament, loading, error, updateTournament, registerTeam, updatePlayerStatus };
};

export default useTournament;
