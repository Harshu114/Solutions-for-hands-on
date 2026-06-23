-- =====================================================
-- EXERCISE 1 - SCENARIO 2
-- Set VIP TRUE for balance > 10000
-- =====================================================

DELIMITER //

CREATE PROCEDURE UpdateVIPStatus()
BEGIN
    UPDATE Customers
    SET IsVIP = TRUE
    WHERE balance > 10000;
END //

DELIMITER ;

-- =====================================================
-- TESTING OUTPUT FOR SCENARIO 2
-- =====================================================

CALL UpdateVIPStatus();

SELECT * FROM Customers;
