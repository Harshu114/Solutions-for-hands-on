-- =====================================================
-- EXERCISE 3 - SCENARIO 3
-- Transfer funds between accounts
-- =====================================================

DELIMITER //

CREATE PROCEDURE TransferFunds
(
    IN from_account INT,
    IN to_account INT,
    IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE source_balance DECIMAL(10,2);

    SELECT balance
    INTO source_balance
    FROM Accounts
    WHERE account_id = from_account;

    IF source_balance < amount THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT='Insufficient balance';
    END IF;

    UPDATE Accounts
    SET balance = balance - amount
    WHERE account_id = from_account;

    UPDATE Accounts
    SET balance = balance + amount
    WHERE account_id = to_account;
END //

DELIMITER ;

-- =====================================================
-- TESTING OUTPUT FOR SCENARIO 3
-- =====================================================

CALL TransferFunds(201,203,5000);

SELECT * FROM Accounts;
