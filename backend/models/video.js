// video.js
module.exports = (sequelize, DataTypes) => {
  const video = sequelize.define('video', {
    video_id: {
      type: DataTypes.STRING,
      primaryKey: true, // Set as the primary key
    },
    publishedat: DataTypes.DATE,
    channelid: DataTypes.STRING,
    channeltitle: DataTypes.STRING,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    tags: DataTypes.ARRAY(DataTypes.TEXT),
    duration: DataTypes.TEXT,
    dimension: DataTypes.TEXT,
    definition: DataTypes.TEXT,
    caption: DataTypes.BOOLEAN,
    licensedcontent: DataTypes.BOOLEAN,
    projection: DataTypes.TEXT,
    viewcount: DataTypes.INTEGER,
    likecount: DataTypes.INTEGER,
    favoritecount: DataTypes.INTEGER,
    commentcount: DataTypes.INTEGER,
    topiccategories: DataTypes.ARRAY(DataTypes.TEXT),
    fetchtimestamp: DataTypes.DATE
  }, 
  {
    timestamps: false, // Disable the createdAt and updatedAt columns
    // Other model options go here
  });
  return video;
}
