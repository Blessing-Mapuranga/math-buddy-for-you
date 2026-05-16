import 'dart:convert';
import 'package:http/http.dart' as http;

class MathBuddyApiClient {
  final String baseUrl;
  final http.Client _client;

  MathBuddyApiClient({required this.baseUrl, http.Client? client})
    : _client = client ?? http.Client();

  Future<Map<String, dynamic>> parseTextbook(
    String chapterText, {
    String? localJson,
    String chapter = '',
    String textbook = 'Iyengar Engineering Mathematics',
  }) async {
    final response = await _post('/api/parse-textbook', {
      'chapter_text': chapterText,
      'local_json_data': localJson,
      'chapter': chapter,
      'textbook': textbook,
    });
    return response;
  }

  Future<Map<String, dynamic>> teachProblem(
    String problemContext, {
    String? chapter,
    String textbook = 'Iyengar Engineering Mathematics',
  }) async {
    final response = await _post('/api/teach', {
      'problem_context': problemContext,
      'chapter': chapter,
      'textbook': textbook,
    });
    return response;
  }

  Future<Map<String, dynamic>> extractNotes(
    String chapterText, {
    String? chapter,
    String textbook = 'Iyengar Engineering Mathematics',
  }) async {
    final response = await _post('/api/extract-notes', {
      'chapter_text': chapterText,
      'chapter': chapter,
      'textbook': textbook,
    });
    return response;
  }

  Future<Map<String, dynamic>> generateMcq(
    String sourceText, {
    String? chapter,
    String difficulty = 'medium',
    String textbook = 'Iyengar Engineering Mathematics',
    int questionCount = 1,
  }) async {
    final response = await _post('/api/generate-mcq', {
      'chapter': chapter,
      'source_text': sourceText,
      'difficulty': difficulty,
      'textbook': textbook,
      'question_count': questionCount,
    });
    return response;
  }

  Future<Map<String, dynamic>> startAssessment(
    String sourceText, {
    String? chapter,
    String textbook = 'Iyengar Engineering Mathematics',
    int questionCount = 50,
  }) async {
    final response = await _post('/api/start-assessment', {
      'chapter': chapter,
      'source_text': sourceText,
      'textbook': textbook,
      'question_count': questionCount,
    });
    return response;
  }

  Future<Map<String, dynamic>> fetchAssessmentStatus(String taskId) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/api/assessment-status/$taskId'),
    );
    return _decodeResponse(response);
  }

  Future<Map<String, dynamic>> fetchStats() async {
    final response = await _client.get(Uri.parse('$baseUrl/api/stats'));
    return _decodeResponse(response);
  }

  Uri _buildUri(String path) {
    final normalizedBase = baseUrl.endsWith('/')
        ? baseUrl.substring(0, baseUrl.length - 1)
        : baseUrl;
    final normalizedPath = path.startsWith('/') ? path : '/$path';
    return Uri.parse('$normalizedBase$normalizedPath');
  }

  Future<Map<String, dynamic>> _post(
    String path,
    Map<String, dynamic> body,
  ) async {
    final response = await _client.post(
      _buildUri(path),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );
    return _decodeResponse(response);
  }

  Map<String, dynamic> _decodeResponse(http.Response response) {
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('HTTP ${response.statusCode}: ${response.body}');
    }
    return jsonDecode(response.body) as Map<String, dynamic>;
  }
}
