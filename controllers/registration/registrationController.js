module.exports.addRetailer = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const {
            ShopPhoneNumber,
            TIN,
            ShopName,
            ShopType,
            Website,
            ShopEmail,
            Password,
            ShopImage,
            HouseNumber,
            Street,
            ZIP,
            Thana,
            Division,
            AddressDetails,
            OwnerName,
            OwnerDateOfBirth,
            OwnerImage,
            OwnerNID,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save retailer details to the database or perform other actions

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Retailer created successfully',
        });
    } catch (error) {
        console.error('Error adding retailer:', error);

        // Responding with client errors
        if (error instanceof ValidationError) {
            // Assuming ValidationError is a custom error class for validation errors
            res.status(400).json({
                success: false,
                message: 'Bad Request: Invalid input data',
            });
        } else if (error instanceof DuplicateEntryError) {
            // Assuming DuplicateEntryError is a custom error class for duplicate entry errors
            res.status(409).json({
                success: false,
                message: 'Conflict: Retailer with the provided data already exists',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
};

module.exports.addCompany = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const {
            PhoneNumber,
            TIN,
            Name,
            Type,
            Website,
            Email,
            Password,
            Logo,
            HouseNumber,
            Street,
            ZIP,
            Thana,
            Division,
            AddressDetails,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save company details to the database or perform other actions

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Manufacturing company created successfully',
        });
    } catch (error) {
        console.error('Error adding manufacturing company:', error);

        // Responding with client errors
        if (error instanceof ValidationError) {
            // Assuming ValidationError is a custom error class for validation errors
            res.status(400).json({
                success: false,
                message: 'Bad Request: Invalid input data',
            });
        } else if (error instanceof DuplicateEntryError) {
            // Assuming DuplicateEntryError is a custom error class for duplicate entry errors
            res.status(409).json({
                success: false,
                message: 'Conflict: Company with the provided data already exists',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
};

module.exports.addManufacturingCompanyOwner = (req, res) => {
    try {
        // Extracting input parameters from the request body
        const {
            MID,
            OwnerName,
            OwnerDateOfBirth,
            OwnerImage,
            OwnerEmail,
            OwnerPhone,
            OwnerNID,
        } = req.body;

        // TODO: Perform any necessary validation or business logic

        // TODO: Save owner details to the database or perform other actions

        // Responding with success
        res.status(201).json({
            success: true,
            message: 'Owner created successfully under the manufacturing company',
        });
    } catch (error) {
        console.error('Error adding manufacturing company owner:', error);

        // Responding with client errors
        if (error instanceof ValidationError) {
            // Assuming ValidationError is a custom error class for validation errors
            res.status(400).json({
                success: false,
                message: 'Bad Request: Invalid input data',
            });
        } else if (error instanceof DuplicateEntryError) {
            // Assuming DuplicateEntryError is a custom error class for duplicate entry errors
            res.status(409).json({
                success: false,
                message: 'Conflict: Owner with the provided data already exists',
            });
        } else {
            // Responding with server errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
};
