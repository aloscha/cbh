# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assumtpions:
- There are relations between Facility-Shifts and Shifts-Agent (every shift contains facilityId and agentId, bcause during 1 shift only 1 agent can work)
- 1 agent can work on multiple shifts for multiple facilities
- 1 agent can have multiple custom ids (because he has shifts in multiple facilities)
- 1 agent who has multiple shifts in 1 facilities will always has 1 custom ID
- IDs are integer type, customId is string type (like guid or custom name, typically used by organizations)
- Custom ID could be same in multiple facilities

Acceptance criteria:
- Table with relation to facilities and agents, customdId as an extra field
- Updated code and new function generateReportWithAgentId
- PDF as a report result
- Green tests for new function

Tasks:
1. Create new table "AgentExtraData" with (facilityId: int, agentId: int, customId: string)
 * Add relation from table AgentExtraData to Facility (create foreignKey facilityId)
 * Add relation from table AgentExtraData to Agent (create foreignKey agentId)
 * Add relation from table to Facility (create foreignKey facilityId)
 * Add primary key for AgentExtraData table (facilityId, agentId)

2. Expand assign Agent to shift funtionality
 * Write function called GetAgentsByFacilityId wich should return agents with customId (all agentId by facilityId from AgentExtraData table)
 * When you assign new agent (not previously existed in facility) to shift, which assigned to facilityid add field customId otherwise ignore (you can check if user existed in facility from function above)
 * Save customId in separate table called AgentExtraData.

3. Add new functionality to setup customId to existing agents in facilities
 * Add mapping view (could be reused from 2nd point) agents in facilities so user has easy to assign customId

4. Add new data generation
 * Create new function generateReportWithCustomId which will return Shifts with Agent with CustomId. Because shift has facilityId and agent (related to shift) has agentId we can easily find and map correct customId from AgentExtraData (simple join in SQL)
 * Return such data as a result from function

5. Generate new report
 * Add new PDF template to support cusotmId places
 * Data comes from point 4 please convert and fill in the PDF template

6. Add tests to check scenarios from 2-4
Example QA scenarios:
 * Add null/empty customId when assign agent to shift
 * Add correct customId and call GetAgentsByFacilityId to check if customId existed there
 * Generate new report and check if data under customId are there