import BadRequestException from "../../shared/exception/BadRequestException";
import { sequelize } from "../../sequelize";
import { User } from "../../models/User";
import { Wallet } from "../../models/Wallet";
import { Transaction } from "../../models/Transaction";
import NotFoundException from "../../shared/exception/NotFoundException";

const ACCOUNTPATTERN = "0023786904";
// otp status
const VERIFIED = "VERIFIED";
const UNVERIFIED = "UNVERIFIED";
const CREDIT = "CREDIT";
const DEBIT = "DEBIT";
const AMOUNT = 500.0;
const MINIMUM_AMOUNT = 100.0;
const MAXIMUM_AMOUNT = 1000.0;

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

/**
 * @class UserService
 */

export class UserService {
  /**
   * @method  create
   * @description signup new user
   * @returns {}
   * @param data
   */
  public static async create(data: any) {
    try {
      let accountNo: string;

      await User.count().then((res) => {
        res == 0
          ? (accountNo = `00${parseInt(ACCOUNTPATTERN) + 1}`)
          : (accountNo = `00${parseInt(ACCOUNTPATTERN) + res + 1}`);
      });

      const { fullname, username, phone_no, email } = data;
      const otp = generateOTP();
      if (data) {
        await sequelize.transaction(async (transaction) => {
          const user = await User.create(
            {
              fullName: fullname,
              username,
              phoneNo: phone_no,
              email,
              accountNo,
              otp,
              status: UNVERIFIED,
            },
            {
              transaction,
            }
          );

          const wallet = await Wallet.create(
            {
              userId: user.id,
              amount: AMOUNT,
            },
            {
              transaction,
            }
          );

          await Transaction.create(
            {
              userId: user.id,
              walletId: wallet.id,
              amount: AMOUNT,
              transactionType: CREDIT,
            },
            {
              transaction,
            }
          );
        });

        return {
          account_no: accountNo,
          otp,
        };
      }

      throw new BadRequestException("failed to signup a new user");
    } catch (e) {
      throw new BadRequestException("" + e);
    }
  }

  public static async findByOTP(otp: string) {
    try {
      const user = await User.findOne({ where: { otp } });
      if (user.status === VERIFIED) {
        throw new BadRequestException("you can't verify twice");
      }
      const res = await User.update({ status: VERIFIED }, { where: { otp } });
      if (res[0] == 1) {
        return;
      }
      throw new BadRequestException("unable to verify");
    } catch (e) {
      throw new BadRequestException("" + e);
    }
  }

  public static async generateOTP(otp: string) {
    try {
      // find user by username
      const user = await User.findOne({ where: { otp } });
      if (user) {
        // const diff2: any = moment(user.creationDate);
        // const diff1: any = moment(new Date());

        const genOtp = generateOTP();
        await User.update({ otp: genOtp }, { where: { otp } });
        return { otp: genOtp };
      }

      throw new NotFoundException("otp not found");
    } catch (e) {
      throw new NotFoundException("" + e);
    }
  }

  public static async transfer(data: any) {
    try {
      const { account_no, amount } = data;
      const user = await User.findOne({ where: { accountNo: account_no } });
      if (user) {
        const wallet = await Wallet.findOne({ where: { userId: user.id } });
        let charges: number;

        if (amount < MINIMUM_AMOUNT) {
          throw new BadRequestException("amount must not be less than N100");
        }

        // =====> DRY
        if (amount > MAXIMUM_AMOUNT) {
          charges = amount * 0.1;
          //   const newBal = amount - charges
          await sequelize.transaction(async (transaction) => {
            Wallet.update(
              { amount: wallet.amount + (amount - charges) },
              { where: { id: wallet.id }, transaction }
            );

            await Transaction.create(
              {
                userId: user.id,
                walletId: wallet.id,
                amount: amount - charges,
                transactionType: CREDIT,
              },
              {
                transaction,
              }
            );

            await Transaction.create(
              {
                userId: user.id,
                walletId: wallet.id,
                amount: charges,
                transactionType: DEBIT,
              },
              {
                transaction,
              }
            );
          });

          return;
        }

        // amount not more than N1000
        await sequelize.transaction(async (transaction) => {
          Wallet.update(
            { amount: wallet.amount + amount },
            { where: { id: wallet.id }, transaction }
          );

          await Transaction.create(
            {
              userId: user.id,
              walletId: wallet.id,
              amount: amount,
              transactionType: CREDIT,
            },
            {
              transaction,
            }
          );
        });

        return;
      }

      throw new BadRequestException("transfer was not successful");
    } catch (e) {
      throw new BadRequestException("" + e);
    }
  }
}
