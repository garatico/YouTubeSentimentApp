// channel.js
module.exports = (sequelize, DataTypes) => {
  const channel = sequelize.define("channel", {
    channel_id: {
        type: DataTypes.STRING,
        primaryKey: true, // Set as the primary key
    },

    title: DataTypes.STRING,
    description: DataTypes.STRING,
    customurl: DataTypes.STRING,
    publishedat: DataTypes.DATE,
    country: DataTypes.TEXT,
    likesplaylist: DataTypes.TEXT,
    uploadsplaylist: DataTypes.TEXT,
    viewcount: DataTypes.INTEGER,
    subscribercount: DataTypes.INTEGER,
    hiddensubscribercount: DataTypes.BOOLEAN,
    videocount: DataTypes.INTEGER,

    fetchtimestamp: DataTypes.DATE,
    },
    {
      timestamps: false, // Disable the createdAt and updatedAt columns
      // Other model options go here
    }
  );
  return channel;
};
