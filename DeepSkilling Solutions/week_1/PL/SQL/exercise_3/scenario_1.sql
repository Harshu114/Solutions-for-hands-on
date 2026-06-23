-- =====================================================
-- EXERCISE 3 - SCENARIO 1
-- Process monthly 1% interest for savings accounts
-- =====================================================

DELIMITER //

CREATE PROCEDURE ProcessMonthlyInterest()
BEGIN
    UPDATE Accounts
    SET balance = balance + (balance * 0.01)
    WHERE account_type='SAVINGS';
END //

DELIMITER ;

-- =====================================================
-- TESTING OUTPUT FOR SCENARIO 1
-- =====================================================

CALL ProcessMonthlyInterest();

SELECT * FROM Accounts;
