/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : campus_epidemics

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2022-05-02 10:34:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for authors
-- ----------------------------
DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_name` varchar(255) DEFAULT NULL,
  `a_phone` varchar(255) DEFAULT NULL,
  `a_email` varchar(255) DEFAULT NULL,
  `a_start_time` varchar(255) DEFAULT NULL,
  `a_end_time` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of authors
-- ----------------------------
INSERT INTO `authors` VALUES ('3', '王管理', '123456', '123456@qq.com', '2021-12-19 08:00:00', '2021-12-19 10:00:00', '3');

-- ----------------------------
-- Table structure for campus_notices
-- ----------------------------
DROP TABLE IF EXISTS `campus_notices`;
CREATE TABLE `campus_notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `n_title` varchar(255) DEFAULT NULL,
  `n_content` varchar(255) DEFAULT NULL,
  `n_date` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of campus_notices
-- ----------------------------
INSERT INTO `campus_notices` VALUES ('1', '深圳技术大学从严从紧加强疫情防控管理工作的紧急通知', '根据2022年3月11日《深圳市校园疫情防控工作专班关于从严从紧加强高校疫情防控管理工作的紧急通知》要求，结合现阶段深圳市疫情防控形势及校内实际情况，为确保学校师生员工生命安全和身体健康，从严从紧加强学校疫情防控管理工作，现就有关要求紧急通知如下：', '2021-12-11 00:00:00', '3');
INSERT INTO `campus_notices` VALUES ('2', '关于加强新冠肺炎疫情防控工作的通知', '近期，国内疫情点多、面广、频发，德尔塔和奥密克戎变异株叠加流行，多地校园发生疫情，疫情防控更加严峻复杂。必须始终绷紧疫情防控这根弦，不能有丝毫麻痹松懈和侥幸心理，要全力以赴做好疫情防控各项工作。现就加强新冠肺炎疫情防控工作通知如下：', '2021-12-11 00:00:00', '3');
INSERT INTO `campus_notices` VALUES ('3', '2020有关“新冠疫情”近百个作文题目，含范文+标题+时评汇编 ', '武汉疫情爆发后，各地支援武汉，出现了一批批的90 后白衣天使，他们担起了疫情的重任。所谓白衣天使，只不过是一群孩子，换了身衣服，学者前辈的样子，和死神抢人。勇敢奔赴前线，遏制疫情，保护亿万中国人。作为高中生的你，对此有什么看法，请写一篇文章，题目自拟，题材不限（诗歌除外），不少于800 字，', '2021-12-11 00:00:00', '3');
INSERT INTO `campus_notices` VALUES ('4', '4月23日疫情最新消息吉林白城师范学院校内突发疫情已整体划定为中风险区', '在4月22日举行的新闻发布会上，白城市政府副秘书长孙伟光表示，4月21日15时23分，白城中心医院向市疫情防控领导小组报告，白城师范学院发热医学生核酸检测初筛呈阳性。市疫情防控领导小组接到报告后，立即启动应急响应。市委书记李明伟前往白城师范学院与学校领导小组进行研究和业务相关事宜，然后组织领导小组召开专题会议，决定白城师范学院立即进入静态控制', '2021-12-20 00:00:00', '3');
INSERT INTO `campus_notices` VALUES ('5', '校内疫情消息标题5', '校内疫情消息5', '2021-12-20 16:00:00', '3');

-- ----------------------------
-- Table structure for close_manages
-- ----------------------------
DROP TABLE IF EXISTS `close_manages`;
CREATE TABLE `close_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_building_num` int(11) DEFAULT NULL,
  `m_recent_place` varchar(255) DEFAULT NULL,
  `m_recent_history` varchar(255) DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of close_manages
-- ----------------------------
INSERT INTO `close_manages` VALUES ('1', 'STU03', '李同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '1');
INSERT INTO `close_manages` VALUES ('2', 'STU002', '韩同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '2');
INSERT INTO `close_manages` VALUES ('3', 'STU001', '王同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '3');

-- ----------------------------
-- Table structure for domestic_notices
-- ----------------------------
DROP TABLE IF EXISTS `domestic_notices`;
CREATE TABLE `domestic_notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `n_title` varchar(255) DEFAULT NULL,
  `n_date` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of domestic_notices
-- ----------------------------
INSERT INTO `domestic_notices` VALUES ('1', '四川5月1日新增本土确诊病例6例、本土无症状感染者1例', '2021-12-11 00:00:00', '3');
INSERT INTO `domestic_notices` VALUES ('2', '全国物流保通保畅运行情况', '2021-12-11 00:00:00', '3');
INSERT INTO `domestic_notices` VALUES ('3', '“五一”假期如何做好疫情防控？群众就医如何保障？权威部门这样提示', '2021-12-11 00:00:00', '3');
INSERT INTO `domestic_notices` VALUES ('4', '《谣言面前，不做“看客”，要当“剑客”》', '2021-12-20 01:35:45', '3');
INSERT INTO `domestic_notices` VALUES ('5', '疫情防控是一场总体战 “动态清零”能否搞变通？', '2021-12-20 01:36:14', '3');
INSERT INTO `domestic_notices` VALUES ('6', '上海疫情这些好消息，如何看待？', '2021-12-20 01:36:28', '3');

-- ----------------------------
-- Table structure for health_infoers
-- ----------------------------
DROP TABLE IF EXISTS `health_infoers`;
CREATE TABLE `health_infoers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_name` varchar(255) DEFAULT NULL,
  `i_idcard` varchar(255) DEFAULT NULL,
  `i_phone` varchar(255) DEFAULT NULL,
  `i_gender` int(11) DEFAULT NULL,
  `i_birth` datetime DEFAULT NULL,
  `i_nationality` varchar(255) DEFAULT NULL,
  `i_domicile` varchar(255) DEFAULT NULL,
  `i_native` varchar(255) DEFAULT NULL,
  `i_address` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of health_infoers
-- ----------------------------
INSERT INTO `health_infoers` VALUES ('1', '李同学', '440666666666666666', '16666666666', '0', '2021-12-11 00:00:00', '中国大陆', '广东广州', '广东', '广东省广州市天河区', '1');
INSERT INTO `health_infoers` VALUES ('2', '韩同学', '440999999999999999', '19999999999', '0', '2021-12-11 00:00:00', '中国大陆', '广东广州', '广东', '广东省广州市天河区', '2');
INSERT INTO `health_infoers` VALUES ('3', '王同学', '440888888888888888', '18888888888', '0', '2021-12-07 00:00:00', '中国大陆', '广东广州', '广东', '广东省广州市天河区', '3');

-- ----------------------------
-- Table structure for health_messages
-- ----------------------------
DROP TABLE IF EXISTS `health_messages`;
CREATE TABLE `health_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_recent_resi` varchar(255) DEFAULT NULL,
  `m_recent_touch` varchar(255) DEFAULT NULL,
  `m_touch_date` datetime DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `m_status_des` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of health_messages
-- ----------------------------
INSERT INTO `health_messages` VALUES ('1', 'STU003', '李同学', '计算机学院', '18级软工12班', '广州', '饭堂', '2021-12-11 00:00:00', '完美', '无', '1');
INSERT INTO `health_messages` VALUES ('2', 'STU002', '韩同学', '计算机学院', '18级软工12班', '广州', '饭堂', '2021-12-11 00:00:00', '完美', '无', '2');
INSERT INTO `health_messages` VALUES ('3', 'STU001', '王同学', '计算机学院', '18级软工12班', '广州', '饭堂', '2021-12-20 11:05:56', '完美', '无', '3');

-- ----------------------------
-- Table structure for health_records
-- ----------------------------
DROP TABLE IF EXISTS `health_records`;
CREATE TABLE `health_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `r_stuid` varchar(255) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `r_vaccine` varchar(255) DEFAULT NULL,
  `r_inject` int(11) DEFAULT NULL,
  `r_num` int(11) DEFAULT NULL,
  `r_manufacturer` varchar(255) DEFAULT NULL,
  `r_vac_unit` varchar(255) DEFAULT NULL,
  `r_vac_date` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of health_records
-- ----------------------------
INSERT INTO `health_records` VALUES ('1', 'STU003', '李同学', '新型冠状病毒灭活疫苗', '3', '20211211', '北京生物', '东莞松山湖社区卫生服务中心预防接种门诊', '2021-11-28 00:00:00', '1');
INSERT INTO `health_records` VALUES ('2', 'STU002', '韩同学', '新型冠状病毒灭活疫苗', '3', '20211211', '广州生物', '东莞松山湖社区卫生服务中心预防接种门诊', '2021-11-28 00:00:00', '2');
INSERT INTO `health_records` VALUES ('3', 'STU001', '王同学', '新型冠状病毒灭活疫苗', '3', '20211211', '广州生物', '东莞松山湖社区卫生服务中心预防接种门诊', '2021-11-28 00:00:00', '3');

-- ----------------------------
-- Table structure for highrick_manages
-- ----------------------------
DROP TABLE IF EXISTS `highrick_manages`;
CREATE TABLE `highrick_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_building_num` int(11) DEFAULT NULL,
  `m_recent_place` varchar(255) DEFAULT NULL,
  `m_recent_history` varchar(255) DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of highrick_manages
-- ----------------------------
INSERT INTO `highrick_manages` VALUES ('1', 'STU003', '李同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '1');
INSERT INTO `highrick_manages` VALUES ('2', 'STU002', '韩同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '2');
INSERT INTO `highrick_manages` VALUES ('3', 'STU001', '王同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '3');

-- ----------------------------
-- Table structure for infection_manages
-- ----------------------------
DROP TABLE IF EXISTS `infection_manages`;
CREATE TABLE `infection_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_build_num` int(11) DEFAULT NULL,
  `m_inject_source` varchar(255) DEFAULT NULL,
  `m_inject_date` datetime DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of infection_manages
-- ----------------------------
INSERT INTO `infection_manages` VALUES ('1', 'STU003', '李同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '饭堂', '2021-12-11 00:00:00', '1');
INSERT INTO `infection_manages` VALUES ('2', 'STU002', '韩同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '饭堂', '2021-12-11 00:00:00', '2');
INSERT INTO `infection_manages` VALUES ('3', 'STU001', '王同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '饭堂', '2021-12-11 00:00:00', '3');

-- ----------------------------
-- Table structure for journals
-- ----------------------------
DROP TABLE IF EXISTS `journals`;
CREATE TABLE `journals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `j_stuid` varchar(255) DEFAULT NULL,
  `j_name` varchar(255) DEFAULT NULL,
  `j_role` int(11) DEFAULT NULL,
  `j_browser` varchar(255) DEFAULT NULL,
  `j_ip` varchar(255) DEFAULT NULL,
  `j_ipname` varchar(255) DEFAULT NULL,
  `j_date` varchar(255) DEFAULT NULL,
  `j_status` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of journals
-- ----------------------------
INSERT INTO `journals` VALUES ('54', 'STU001', '王同学', '3', 'Chrome', '219.237.181.28', '北京市', '2022-05-02 09:23:01', '登录成功', '3');
INSERT INTO `journals` VALUES ('55', 'CB18888888888', '王管理', '3', 'Chrome', '219.237.181.28', '北京市', '2022-05-02 10:05:45', '登录成功', '3');

-- ----------------------------
-- Table structure for journey_datas
-- ----------------------------
DROP TABLE IF EXISTS `journey_datas`;
CREATE TABLE `journey_datas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `d_stuid` varchar(255) DEFAULT NULL,
  `d_name` varchar(255) DEFAULT NULL,
  `d_college` varchar(255) DEFAULT NULL,
  `d_class` varchar(255) DEFAULT NULL,
  `d_building` varchar(255) DEFAULT NULL,
  `d_build_num` int(11) DEFAULT NULL,
  `d_return_num` varchar(255) DEFAULT NULL,
  `d_return_date` datetime DEFAULT NULL,
  `d_start_area` varchar(255) DEFAULT NULL,
  `d_arrival_area` varchar(255) DEFAULT NULL,
  `d_in_reach` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of journey_datas
-- ----------------------------
INSERT INTO `journey_datas` VALUES ('1', 'STU003', '李同学', '计算机学院', '18级软工12班', 'A2', '1212', 'G1536', '2021-12-11 00:00:00', '广东广州', '广东东莞', '无', '1');
INSERT INTO `journey_datas` VALUES ('2', 'STU002', '韩同学', '计算机学院', '18级软工12班', 'A2', '1212', 'G1536', '2021-12-11 00:00:00', '广东广州', '广东东莞', '无', '2');
INSERT INTO `journey_datas` VALUES ('3', 'STU001', '啊欢', '计算机系', '192', '15', '923', 'G875', '2022-05-05 00:00:00', '广州', '北京', '天津，上海，浙江', '3');
INSERT INTO `journey_datas` VALUES ('8', 'CB18888888888', '王管理', '计算机系', '12', '622', '45', 'K456', '2022-05-17 00:00:00', '广州', '北京', '天津', '3');

-- ----------------------------
-- Table structure for lowrick_manages
-- ----------------------------
DROP TABLE IF EXISTS `lowrick_manages`;
CREATE TABLE `lowrick_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_building_num` int(11) DEFAULT NULL,
  `m_recent_place` varchar(255) DEFAULT NULL,
  `m_recent_history` varchar(255) DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of lowrick_manages
-- ----------------------------
INSERT INTO `lowrick_manages` VALUES ('1', 'STU003', '李同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '3');
INSERT INTO `lowrick_manages` VALUES ('2', 'STU002', '韩同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '3');
INSERT INTO `lowrick_manages` VALUES ('3', 'STU001', '王同学', '0', '计算机学院', '18级软工12班', 'A2', '1212', '东莞', '饭堂', '完美', '3');

-- ----------------------------
-- Table structure for personal_infos
-- ----------------------------
DROP TABLE IF EXISTS `personal_infos`;
CREATE TABLE `personal_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_stuid` varchar(255) DEFAULT NULL,
  `i_name` varchar(255) DEFAULT NULL,
  `i_gender` int(11) DEFAULT NULL,
  `i_birth` datetime DEFAULT NULL,
  `i_nation` varchar(255) DEFAULT NULL,
  `i_university` varchar(255) DEFAULT NULL,
  `i_college` varchar(255) DEFAULT NULL,
  `i_class` varchar(255) DEFAULT NULL,
  `i_profession` varchar(255) DEFAULT NULL,
  `i_enter_time` datetime DEFAULT NULL,
  `i_background` varchar(255) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of personal_infos
-- ----------------------------
INSERT INTO `personal_infos` VALUES ('1', '16666666666', '李同学', '0', '1999-03-17 00:00:00', '汉族', '阳光小学三中', '计算机学院', '18级软工12班', '软件工程', '1999-03-17 00:00:00', '学士', '1');
INSERT INTO `personal_infos` VALUES ('2', '19999999999', '韩同学', '0', '1999-03-17 00:00:00', '汉族', '阳光小学二中', '计算机学院', '18级软工12班', '软件工程', '1999-03-17 00:00:00', '学士', '2');
INSERT INTO `personal_infos` VALUES ('3', '18888888888', '王管理', '0', '1999-03-16 16:00:00', '汉族', '阳光小学一中', '计算机学院', '18级软工12班', '软件工程', '2020-10-09 16:00:00', '学士', '3');
INSERT INTO `personal_infos` VALUES ('18', 'STU001', '王同学', '0', '2021-12-20 16:00:00', '汉族', '香港大学', '计算机与科学', '硕计111班', '软件工程', '2021-12-20 16:00:00', '硕士研究生', '3');
INSERT INTO `personal_infos` VALUES ('19', 'CB18888888888', '啊欢', '0', '2022-05-05 00:00:00', '汉族', '清华大学', '计算机系', '189班', null, null, null, '3');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `r_account` varchar(255) DEFAULT NULL,
  `r_pwd` varchar(255) DEFAULT NULL,
  `r_serial` varchar(255) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `r_role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '16666666666', '$2a$10$bZMFeiTT/hX.KM8wy3dg6e/K/XgH8x69i2COIx6rmEkYHpto/nEsO', 'CB16666666666', '李同学', '1');
INSERT INTO `roles` VALUES ('2', '19999999999', '$2a$10$bZMFeiTT/hX.KM8wy3dg6e/K/XgH8x69i2COIx6rmEkYHpto/nEsO', 'CB19999999999', '韩老师', '2');
INSERT INTO `roles` VALUES ('3', '18888888888', '$2a$10$bZMFeiTT/hX.KM8wy3dg6e/K/XgH8x69i2COIx6rmEkYHpto/nEsO', 'CB18888888888', '王管理', '3');
INSERT INTO `roles` VALUES ('26', 'admin1', '$2a$10$fm1zBl/evL3qHM38yo0PSOodi8Z2uA8nAoz1.UhMSwBrL8MhQN.GK', 'admin001', '王老师啊兼职管理', '2');

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
INSERT INTO `sequelizemeta` VALUES ('20211210132155-create-roles.js');
INSERT INTO `sequelizemeta` VALUES ('20211210161324-create-personal-infos.js');
INSERT INTO `sequelizemeta` VALUES ('20211211023511-create-lowrick-manages.js');
INSERT INTO `sequelizemeta` VALUES ('20211211031503-create-highrick-manages.js');
INSERT INTO `sequelizemeta` VALUES ('20211211032901-create-close-manages.js');
INSERT INTO `sequelizemeta` VALUES ('20211211034301-create-infection-manages.js');
INSERT INTO `sequelizemeta` VALUES ('20211211041019-create-journey-datas.js');
INSERT INTO `sequelizemeta` VALUES ('20211211043828-create-journey-datas.js');
INSERT INTO `sequelizemeta` VALUES ('20211211050830-create-health-records.js');
INSERT INTO `sequelizemeta` VALUES ('20211211053204-create-health-records.js');
INSERT INTO `sequelizemeta` VALUES ('20211211070408-create-health-messages.js');
INSERT INTO `sequelizemeta` VALUES ('20211211072537-create-health-infoers.js');
INSERT INTO `sequelizemeta` VALUES ('20211211075507-create-domestic-notices.js');
INSERT INTO `sequelizemeta` VALUES ('20211211081134-create-campus-notices.js');
INSERT INTO `sequelizemeta` VALUES ('20211211082527-create-authors.js');
INSERT INTO `sequelizemeta` VALUES ('20211211083405-create-authors.js');
INSERT INTO `sequelizemeta` VALUES ('20211211084143-create-authors.js');
INSERT INTO `sequelizemeta` VALUES ('20211211085552-create-journals.js');
INSERT INTO `sequelizemeta` VALUES ('20211228042318-create-journals.js');
