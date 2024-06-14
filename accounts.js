module.exports = (sequelize, DataTypes) => {
    return sequelize.define('accounts', {
        main: {
            type: DataTypes.STRING,
            // defaultValue: 'tmp',
            allowNull: false,
            primaryKey: true,
        },
        alt1: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: true,
        },
        alt2: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: true,
        },
        alt3: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: true,
        },
        alt4: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: true,
        },
        alt5: {
            type: DataTypes.STRING,
            defaultValue: '0',
            allowNull: true,
        },
        },
        {
            timestamps: false
        });
};

// DataTypes.STRING
// DataTypes.INTEGER
// DataTypes.BOOLEAN



/**
 fieldname: {
        type: DataTypes.STRING,
        defaultValue: 'tmp',
        allowNull: false,
    },

 id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1 || .UUIDV4,
        primaryKey: true,
    },

 {
            timestamps: false
        });
 */