# Secure Secrets - Hide API Keys from Git Repo

## Steps:
- [x] 1. Create .env files in frontend and backend with all secrets.
- [x] 2. Update firebaseConfig.js to use environment variables.
- [x] 3. Update .gitignore files to ignore .env*.
- [x] 4. Create .env.example files.
- [ ] 5. Remove old secrets from Git (git rm --cached + commit).
- [ ] 6. Clean entire Git history of secrets (recommend BFG or filter-repo).
- [ ] 7. Test app (npm run dev frontend/backend).
- [ ] 8. Regenerate compromised Firebase keys in console.
- [ ] 9. Force push cleaned repo.

**Status: Files updated. Next: Git cleanup + test.**
