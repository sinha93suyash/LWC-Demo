public with sharing class OppStage {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOppstage(
        String stageName,
        String sortBy,
        String sortDirection
    ) {

        // Default sorting
        if (String.isBlank(sortBy)) {
            sortBy = 'Amount';
        }

        if (String.isBlank(sortDirection)) {
            sortDirection = 'DESC';
        }

        // Allow sorting only on these fields
        Set<String> allowedFields = new Set<String>{
            'Name',
            'StageName',
            'Amount',
            'CloseDate'
        };

        if (!allowedFields.contains(sortBy)) {
            sortBy = 'Amount';
        }

        // Validate sort direction
        if (sortDirection == null ||
            !(sortDirection.equalsIgnoreCase('ASC') ||
              sortDirection.equalsIgnoreCase('DESC'))) {

            sortDirection = 'DESC';
        }

        String query =
            'SELECT Id, Name, Amount, StageName, CloseDate ' +
            'FROM Opportunity';

        // Filter only when a specific stage is selected
        if (!String.isBlank(stageName) &&
            stageName != 'All Stages') {

            query += ' WHERE StageName = :stageName';
        }

        // Dynamic ORDER BY
        query += ' ORDER BY ' + sortBy + ' ' + sortDirection;

        System.debug(query);

        return Database.query(query);
    }
}