import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import moment from 'moment';

@Entity({ name: 't_report' })
export class T_REPORT {
  @PrimaryGeneratedColumn('increment')
  ID?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'FSK',
  })
  DEPARTMENT?: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  REPORTID?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  PATIENT_NUMBER?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  ACCESSION_NUMBER?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  PATIENT_NAME?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '年龄',
  })
  PATIENT_AGE?: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: '年龄单位',
  })
  AGE_UNIT?: string;
  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
    comment: '性别',
  })
  GENDER?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '患者类型',
  })
  PATIENT_TYPE?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: 'HIS_ID',
  })
  HIS_ID?: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: '床号',
  })
  BED_ID?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  MODALITY_TYPE?: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  TECHNICIAN?: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  REPORT_DOCTOR?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '报告医生工号',
  })
  REPORT_DOCTOR_JOB_NUMBER?: string;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  AUDIT_DOCTOR?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '审核医生工号',
  })
  AUDIT_DOCTOR_JOB_NUMBER?: string;
  @Column({
    type: 'datetime',
    nullable: true,
    comment: '登记时间',
  })
  REGISTER_TIME?: string;
  @Column({
    type: 'datetime',
    nullable: true,
    comment: '检查时间',
  })
  STUDY_TIME?: string;
  @Column({
    type: 'datetime',
    nullable: true,
    comment: '报告时间',
  })
  REPORT_TIME?: string;
  @Column({
    type: 'datetime',
    default: moment().format('YYYY-MM-DD HH:mm:ss'),
    nullable: true,
    comment: '检查时间',
  })
  AUDIT_TIME?: string;
  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  REPORT_URL?: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '检查名称',
  })
  DESCRIPTION?: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: '检查方式',
  })
  DESCRIPTION_METHOD?: string;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '申请科室',
  })
  APPLY_DEPT?: string;
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '申请医生',
  })
  APPLY_DOCTOR?: string;
  @Column({
    type: 'text',
    nullable: true,
    comment: '诊断描述',
  })
  REPRESENTATION?: string;
  @Column({
    type: 'text',
    nullable: true,
    comment: '诊断结论',
  })
  IMPRESSION?: string;
  @Column({
    type: 'varchar',
    length: 5,
    nullable: false,
    default: '10',
  })
  STATUS?: string; // 10：未获取报告 20：以获取报告 30：已打印
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '冗余值1',
  })
  REDUNDANCY1?: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '冗余值2',
  })
  REDUNDANCY2?: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '冗余值3',
  })
  REDUNDANCY3?: string;
  @AfterLoad()
  afterLoac() {
    this.REGISTER_TIME = moment(this.REGISTER_TIME).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    this.STUDY_TIME = moment(this.STUDY_TIME).format('YYYY-MM-DD HH:mm:ss');
    this.REPORT_TIME = moment(this.REPORT_TIME).format('YYYY-MM-DD HH:mm:ss');
    this.AUDIT_TIME = moment(this.AUDIT_TIME).format('YYYY-MM-DD HH:mm:ss');
  }
}