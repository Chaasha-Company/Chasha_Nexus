# Review Template

Append the completed record to the task file before committing (review-workflow).

---

```markdown
## Review record — TASK-NNN

- Reviewed at: YYYY-MM-DD
- Diff scope: <files count / summary>
- Gates: npm:check PASS/FAIL · lint PASS/FAIL · tests <n/a|result> · swagger JSON valid YES/NO/NA

### Dimension findings

| Dimension      | Result | Findings (severity) |
| -------------- | ------ | ------------------- |
| Architecture   | pass   | —                   |
| Business logic | pass   | —                   |
| Security       | pass   | —                   |
| Authorization  | pass   | —                   |
| Validation     | pass   | —                   |
| Database       | pass   | —                   |
| Tests          | pass   | —                   |
| Swagger        | pass   | —                   |
| Error handling | pass   | —                   |
| Naming         | pass   | —                   |
| Duplication    | pass   | —                   |

(Severity: blocker | major | minor | note; every finding gets a resolution line.)

### Ten questions

1. Does the implementation satisfy the task? <yes/no + one line>
2. Does it preserve architecture? <...>
3. Does it introduce unnecessary coupling? <...>
4. Does it create security risks? <...>
5. Does it create authorization gaps? <...>
6. Does it maintain API consistency? <...>
7. Does it maintain database consistency? <...>
8. Are tests sufficient? <...>
9. Is Swagger synchronized? <...>
10. Is the code production-ready? <...>

### Verdict

- Verdict: approved | changes-required
- Blockers resolved: <list or n/a>
- Operator waivers: <list or none>
```
