# Projects API

REST API endpoints for managing computation jobs.

---

## Base URL

```
http://localhost:3000/api
```

Production: `https://the-loom.vercel.app/api`

---

## Authentication

Currently, wallet addresses are used for authentication. Future versions will implement JWT tokens.

---

## Endpoints

### <span className="api-method api-method-get">GET</span> List All Projects

Retrieve all projects, sorted by newest first.

#### Request

```http
GET /api/projects
```

#### Response

```json
{
  "success": true,
  "projects": [
    {
      "id": 1,
      "title": "Train MNIST Model",
      "description": "CNN training for digit classification",
      "type": "IA",
      "price": 2.5,
      "wallet_address": "0x1234...5678",
      "status": "PENDING",
      "progress": 0,
      "created_at": "2024-11-06T10:30:00Z",
      "cloud_link": "https://example.com/dataset.zip",
      "script_path": "/uploads/1699268400-train.py",
      "external_links": [
        "https://arxiv.org/paper/123",
        "https://github.com/user/repo"
      ],
      "attachment_info": "train.py (3.2KB)"
    }
  ]
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `500` | Server error |

---

### <span className="api-method api-method-post">POST</span> Create Project

Create a new computation job.

#### Request

```http
POST /api/projects
Content-Type: multipart/form-data
```

#### Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Project title |
| `description` | string | ❌ | Detailed description |
| `type` | enum | ✅ | `"IA"` or `"GRAFICA"` |
| `price` | number | ✅ | Payment in USDC |
| `wallet_address` | string | ❌ | Client's wallet (0x...) |
| `cloud_link` | string | ❌ | Dataset URL |
| `external_links` | json | ❌ | Array of URLs |
| `script_file` | file | ❌ | Python/Blender script |

#### Example (JavaScript)

```javascript
const formData = new FormData();
formData.append('title', 'Train ResNet50');
formData.append('description', 'Transfer learning for medical images');
formData.append('type', 'IA');
formData.append('price', '5.0');
formData.append('cloud_link', 'https://example.com/dataset.zip');
formData.append('external_links', JSON.stringify([
  'https://arxiv.org/paper/456'
]));

// Add file
const file = document.querySelector('input[type="file"]').files[0];
formData.append('script_file', file);

const response = await fetch('/api/projects', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

#### Example (cURL)

```bash
curl -X POST http://localhost:3000/api/projects \
  -F "title=Train ResNet50" \
  -F "type=IA" \
  -F "price=5.0" \
  -F "cloud_link=https://example.com/dataset.zip" \
  -F "script_file=@train.py"
```

#### Response

```json
{
  "success": true,
  "project": {
    "id": 42,
    "title": "Train ResNet50",
    "type": "IA",
    "price": 5.0,
    "status": "PENDING",
    "script_path": "/uploads/1699268500-train.py",
    "created_at": "2024-11-06T11:00:00Z"
  }
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| `201` | Created successfully |
| `400` | Validation error |
| `500` | Server error |

---

### <span className="api-method api-method-get">GET</span> Get Single Project

Retrieve details of a specific project.

#### Request

```http
GET /api/projects/:id
```

#### Parameters

| Param | Type | Description |
|-------|------|-------------|
| `id` | integer | Project ID |

#### Example

```bash
curl http://localhost:3000/api/projects/42
```

#### Response

```json
{
  "success": true,
  "project": {
    "id": 42,
    "title": "Train ResNet50",
    "status": "WORKING",
    "progress": 45,
    "worker_address": "0xabcd...efgh"
  }
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `404` | Project not found |
| `500` | Server error |

---

### <span className="api-method api-method-put">PUT</span> Update Project

Update project status and progress.

#### Request

```http
PUT /api/projects/:id
Content-Type: application/json
```

#### Body

```json
{
  "status": "WORKING",
  "progress": 50,
  "worker_address": "0xabcd...efgh"
}
```

All fields are optional (partial update supported).

#### Example

```javascript
await fetch(`/api/projects/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: 'COMPLETED',
    progress: 100
  })
});
```

#### Response

```json
{
  "success": true,
  "project": {
    "id": 42,
    "status": "COMPLETED",
    "progress": 100
  }
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| `200` | Updated successfully |
| `400` | Validation error |
| `404` | Project not found |
| `500` | Server error |

---

### <span className="api-method api-method-delete">DELETE</span> Delete Project

Delete a project permanently.

#### Request

```http
DELETE /api/projects/:id
```

#### Example

```bash
curl -X DELETE http://localhost:3000/api/projects/42
```

#### Response

```json
{
  "success": true,
  "message": "Projeto deletado"
}
```

#### Status Codes

| Code | Meaning |
|------|---------|
| `200` | Deleted successfully |
| `404` | Project not found |
| `500` | Server error |

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Detailed error message"
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Campos obrigatórios faltando` | Missing required fields | Include `title`, `type`, `price` |
| `Tipo inválido` | Wrong project type | Use `"IA"` or `"GRAFICA"` |
| `Endereço de carteira inválido` | Invalid wallet format | Must be `0x` + 40 hex chars |
| `Projeto não encontrado` | Invalid project ID | Check if ID exists |

---

## Rate Limiting

Currently no rate limits. Production will implement:

- **100 requests/minute** per IP
- **1000 requests/hour** per wallet

---

## Webhooks (Coming Soon)

Subscribe to project status changes:

```javascript
POST /api/webhooks/register
{
  "url": "https://your-app.com/webhook",
  "events": ["project.created", "project.completed"]
}
```

---

## Next Steps

- [Worker Node API →](/api/workers)
- [Authentication →](/api/authentication)
- [Smart Contract Integration →](/smart-contracts/overview)