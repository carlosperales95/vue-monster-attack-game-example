// import { createApp } from 'vue';

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// const { createApp, ref } = Vue;

const app = Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logs: [],
        };
    },
    computed: {
        monsterBarStyles() {
            return this.monsterHealth < 0
                ? { width: '0%' }
                : { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            return this.playerHealth < 0
                ? { width: '0%' }
                : { width: this.playerHealth + '%' };
        },
        canUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0)
            this.winner = 'draw';
            else if (value <= 0)
            this.winner = 'monster';
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0)
            this.winner = 'draw';
            else if (value <= 0)
            this.winner = 'player';
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            this.playerHealth + healValue > 100
                ? this.playerHealth = 100
                : this.playerHealth += healValue;
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logs = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logs.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount('#game');