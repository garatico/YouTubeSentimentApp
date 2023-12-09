// comment.js
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment_id: {
      type: DataTypes.STRING,
      primaryKey: true, // Set as the primary key
    },
    channelid: DataTypes.STRING,
    videoid: DataTypes.STRING,
    canreply: DataTypes.BOOLEAN,
    totalreplycount: DataTypes.INTEGER,
    ispublic: DataTypes.BOOLEAN,
    textdisplay: DataTypes.TEXT,
    textoriginal: DataTypes.TEXT,
    authordisplayname: DataTypes.TEXT,
    authorchannelid: DataTypes.TEXT,
    canrate: DataTypes.BOOLEAN,
    viewerrating: DataTypes.TEXT,
    likecount: DataTypes.INTEGER,
    publishedat: DataTypes.DATE,
    updatedat: DataTypes.DATE,
    parentid: DataTypes.TEXT,
    fetchtimestamp: DataTypes.DATE
  }, 
  {
    timestamps: false, // Disable the createdAt and updatedAt columns
    // Other model options go here
  });
  return comment;
}
  